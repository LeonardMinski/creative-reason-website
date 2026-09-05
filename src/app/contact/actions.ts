"use server";

import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";
import { engagementTypes } from "@/lib/contact";

export type EnquiryFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Echoed back on error so the form can restore what was typed instead of clearing it. */
  values?: { name: string; email: string; enquiryType: string; message: string };
};

const validEnquiryTypes = [...engagementTypes, "Other"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitEnquiry(
  _prevState: EnquiryFormState,
  formData: FormData
): Promise<EnquiryFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const enquiryType = String(formData.get("enquiryType") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const values = { name, email, enquiryType, message };

  if (!name || !message || !validEnquiryTypes.includes(enquiryType)) {
    return { status: "error", message: "Please fill in every field.", values };
  }
  if (!emailPattern.test(email)) {
    return { status: "error", message: "That doesn't look like a valid email address.", values };
  }

  if (!process.env.RESEND_API_KEY) {
    return {
      status: "error",
      message: "Sorry — the enquiry form isn't connected yet. Please email directly instead.",
      values,
    };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      // Resend's shared sandbox sender — swap for a verified domain address
      // (e.g. enquiries@creativereason.com) once one is set up in Resend.
      from: "Creative Reason enquiries <onboarding@resend.dev>",
      to: siteConfig.contactEmail,
      replyTo: email,
      subject: `New enquiry — ${enquiryType}`,
      text: `From: ${name} <${email}>\nType: ${enquiryType}\n\n${message}`,
    });

    if (error) {
      return {
        status: "error",
        message: "Something went wrong sending that — try emailing directly instead.",
        values,
      };
    }
    return { status: "success" };
  } catch {
    return {
      status: "error",
      message: "Something went wrong sending that — try emailing directly instead.",
      values,
    };
  }
}
