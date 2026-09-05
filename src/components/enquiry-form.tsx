"use client";

import { useActionState } from "react";
import { submitEnquiry, type EnquiryFormState } from "@/app/contact/actions";
import { engagementTypes } from "@/lib/contact";

const initialState: EnquiryFormState = { status: "idle" };

const fieldClass =
  "border-b border-line-light bg-transparent py-2 font-body text-base text-ink outline-none focus-visible:border-signal";
const labelClass = "font-mono text-xs uppercase tracking-widest text-ink/50";

export function EnquiryForm() {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);

  if (state.status === "success") {
    return (
      <p role="status" className="max-w-md font-body text-base leading-relaxed text-ink/70">
        Thanks — your message is on its way. I&rsquo;ll get back to you shortly.
      </p>
    );
  }

  const values = state.values;

  return (
    // Keyed on the error state so the uncontrolled inputs below remount and
    // pick up the restored defaultValue instead of staying blank — React
    // otherwise ignores defaultValue changes on an already-mounted input.
    <form key={JSON.stringify(state)} action={formAction} className="flex max-w-xl flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          defaultValue={values?.name}
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={values?.email}
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="enquiryType" className={labelClass}>
          What do you need?
        </label>
        <select
          id="enquiryType"
          name="enquiryType"
          required
          defaultValue={values?.enquiryType ?? ""}
          className={fieldClass}
        >
          <option value="" disabled>
            Select one
          </option>
          {engagementTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className={labelClass}>
          What are you trying to solve?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          defaultValue={values?.message}
          className={fieldClass}
        />
      </div>

      {state.status === "error" ? (
        <p role="alert" className="font-body text-sm text-signal">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-full bg-ink px-6 py-3 font-mono text-xs uppercase tracking-widest text-paper transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
