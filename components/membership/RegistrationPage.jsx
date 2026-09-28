"use client";

import { useState } from "react";

const inputClass =
  "mt-2 w-full rounded-[5px] border border-[#d3ded7] bg-white px-3.5 py-3 text-sm text-[#11231e] outline-none transition placeholder:text-[#89968f] focus:border-[#1a6658] focus:ring-2 focus:ring-[#1a6658]/15";
const labelClass = "block text-sm font-medium leading-6 text-[#253b33]";

function TextField({ id, label, type = "text", ...props }) {
  return (
    <label className={labelClass} htmlFor={id}>
      {label}
      <input id={id} name={id} type={type} className={inputClass} {...props} />
    </label>
  );
}

function TextArea({ id, label, rows = 4, ...props }) {
  return (
    <label className={labelClass} htmlFor={id}>
      {label}
      <textarea
        id={id}
        name={id}
        rows={rows}
        className={`${inputClass} resize-y`}
        {...props}
      />
    </label>
  );
}

function RadioChoices({ name, legend, options, onOtherChange }) {
  return (
    <fieldset>
      <legend className={labelClass}>{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
        {options.map((option) => (
          <label className="flex min-h-6 items-center gap-2.5 text-sm text-[#42574f]" key={option}>
            <input
              className="size-4 accent-[#1a6658] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a6658]"
              name={name}
              type="radio"
              value={option}
              onChange={onOtherChange ? (event) => onOtherChange(option === "Other" && event.target.checked) : undefined}
            />
            {option === "Other" ? "Other" : option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function CheckChoices({ name, legend, options, onOtherChange }) {
  return (
    <fieldset>
      <legend className={labelClass}>{legend}</legend>
      <div className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
        {options.map((option) => (
          <label className="flex min-h-6 items-start gap-2.5 text-sm leading-6 text-[#42574f]" key={option}>
            <input
              className="mt-1 size-4 shrink-0 accent-[#1a6658] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a6658]"
              name={name}
              type="checkbox"
              value={option}
              onChange={option === "Other" ? (event) => onOtherChange(event.target.checked) : undefined}
            />
            {option === "Other" ? "Other" : option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Section({ number, title, children, className = "" }) {
  return (
    <section className={`border-t border-[#e3e9e5] py-8 first:border-t-0 first:pt-0 md:py-10 ${className}`}>
      <div className="mb-6 flex items-baseline gap-3">
        <span className="text-xs font-semibold tabular-nums text-[#1a6658]">{number}</span>
        <h2 className="text-xl font-semibold text-secondary-foreground md:text-2xl">{title}</h2>
      </div>
      <div className="grid gap-x-7 gap-y-6 md:grid-cols-2">{children}</div>
    </section>
  );
}

function InternalField({ label, value }) {
  return (
    <div className="border-b border-dashed border-[#cbd6cf] pb-3">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 min-h-5 text-sm text-[#78877f]">{value || " "}</p>
    </div>
  );
}

export default function RegistrationPage() {
  const [otherGender, setOtherGender] = useState(false);
  const [otherInterest, setOtherInterest] = useState(false);
  const [otherEmployment, setOtherEmployment] = useState(false);
  const [otherProgramme, setOtherProgramme] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const registration = Object.fromEntries(formData.entries());
    registration.areasOfInterest = formData.getAll("areasOfInterest");
    registration.supportProgrammes = formData.getAll("supportProgrammes");

    try {
      const response = await fetch("/api/membership-registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registration }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to submit your registration right now.");
      }
      setSubmittedName(String(registration.fullName || ""));
      form.reset();
    } catch (submitError) {
      setError(submitError.message || "Unable to submit your registration right now.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <header className="border-b border-[#e1e8e3] bg-white">
        <div className="container-wide py-12 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1a6658]">
            UPLIFTMENT AGAINST HUNGER INITIATIVE NG (UAHIN)
          </p>
          <h1 className="display mt-5 max-w-3xl text-4xl leading-tight text-secondary-foreground md:text-6xl">
            Membership &amp; Community Registration
          </h1>
          <p className="mt-4 text-sm font-medium text-[#52685e]">
            Empowering Lives • Fighting Hunger • Building Hope
          </p>
          <p className="mt-7 max-w-2xl text-base leading-7 text-[#52635b]">
            This form helps individuals and community members connect with UAHIN, share areas of interest, and take part in programmes. Your responses also help us better understand the needs and priorities of the communities we serve.
          </p>
        </div>
      </header>

      <main className="container-wide py-10 md:py-14">
        <div className="mx-auto max-w-4xl">
          {submittedName ? (
            <section aria-live="polite" className="border-l-4 border-[#1a6658] bg-white px-6 py-8 md:px-10">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1a6658]">Registration received</p>
              <h2 className="display mt-3 text-3xl text-secondary-foreground md:text-4xl">Thank you{submittedName ? `, ${submittedName}` : ""}.</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#52635b]">
                Your registration has been received. Thank you for connecting with UAHIN and for your interest in our community programmes.
              </p>
            </section>
          ) : (
            <form className="bg-white px-5 py-7 md:px-10 md:py-10" onSubmit={handleSubmit}>
              {error && (
                <div role="alert" className="mb-7 border-l-4 border-[#a6382b] bg-[#fff6f4] px-4 py-3 text-sm leading-6 text-[#772e25]">
                  {error}
                </div>
              )}

              <Section number="01" title="Personal Information">
                <TextField id="fullName" label="1. Full Name" autoComplete="name" />
                <div className="grid grid-cols-2 gap-4">
                  <TextField id="dateOfBirth" label="2. Date of Birth" type="date" />
                  <TextField id="age" label="Age" type="number" min="0" max="120" inputMode="numeric" />
                </div>
                <div className="md:col-span-2">
                  <RadioChoices name="gender" legend="3. Gender" options={["Male", "Female", "Other"]} onOtherChange={setOtherGender} />
                  {otherGender && <TextField id="genderOther" label="Please specify" className={inputClass} />}
                </div>
                <TextField id="phoneNumber" label="4. Phone Number" type="tel" autoComplete="tel" />
                <TextField id="whatsappNumber" label="5. WhatsApp Number" type="tel" />
                <TextField id="emailAddress" label="6. Email Address" type="email" autoComplete="email" />
                <div className="md:col-span-2">
                  <TextArea id="residentialAddress" label="7. Residential Address" autoComplete="street-address" rows={3} />
                </div>
              </Section>

              <Section number="02" title="Location & Community Information">
                <TextField id="state" label="8. State" autoComplete="address-level1" />
                <TextField id="lga" label="9. Local Government Area (LGA)" />
                <TextField id="ward" label="10. Ward" />
                <TextField id="communityTown" label="11. Community/Town" />
                <TextField id="uahinCoordinatorGroup" label="12. UAHIN Coordinator/Group" />
              </Section>

              <Section number="03" title="UAHIN Membership & Interest">
                <div className="md:col-span-2">
                  <RadioChoices name="membershipStatus" legend="13. Are you a UAHIN member?" options={["Yes", "No", "Applying to become a member"]} />
                </div>
                <div className="md:col-span-2">
                  <CheckChoices
                    name="areasOfInterest"
                    legend="14. Area(s) of Interest"
                    options={["Hunger/Food Support", "Women Empowerment", "Youth Empowerment", "Skills Acquisition", "Livelihood Support", "Community Development", "Humanitarian/Emergency Support", "Other"]}
                    onOtherChange={setOtherInterest}
                  />
                  {otherInterest && <TextField id="areaOfInterestOther" label="Other area of interest" />}
                </div>
                <TextField id="occupationBusiness" label="15. Occupation/Business" />
                <TextField id="skillsExpertise" label="16. Skills/Area of Expertise" />
                <div className="md:col-span-2">
                  <RadioChoices name="employmentStatus" legend="17. Employment Status" options={["Employed", "Self-employed", "Unemployed", "Student", "Other"]} onOtherChange={setOtherEmployment} />
                  {otherEmployment && <TextField id="employmentStatusOther" label="Please specify employment status" />}
                </div>
              </Section>

              <Section number="04" title="Voter Registration Information">
                <div className="md:col-span-2 border-l-4 border-[#d8a95f] bg-[#fbfaf6] px-4 py-3 text-sm leading-6 text-[#4f5e55]">
                  This section is for programme/community records where applicable. Providing voter information is not a condition for receiving UAHIN assistance.
                </div>
                <div className="md:col-span-2">
                  <RadioChoices name="registeredVoter" legend="18. Are you a registered voter?" options={["Yes", "No"]} />
                </div>
                <TextField id="voterState" label="19. State of Voter Registration" />
                <TextField id="voterLga" label="20. LGA of Voter Registration" />
                <TextField id="registrationWard" label="21. Registration Ward" />
                <TextField id="pollingUnit" label="22. Polling Unit" />
                <TextField id="pollingUnitCode" label="23. Polling Unit Code (if known)" />
                <div className="md:col-span-2">
                  <TextArea id="voterIdentificationNumber" label="24. Voter Identification Number (VIN), if required" rows={2} />
                </div>
              </Section>

              <Section number="05" title="Programme & Support Information">
                <div className="md:col-span-2">
                  <RadioChoices name="interestedInProgrammes" legend="25. Are you interested in participating in UAHIN programmes?" options={["Yes", "No"]} />
                </div>
                <div className="md:col-span-2">
                  <CheckChoices
                    name="supportProgrammes"
                    legend="26. What type of support/programme are you interested in?"
                    options={["Food/Hunger Relief", "Business/Financial Empowerment", "Skills Acquisition", "Agricultural Support", "Youth Development", "Women Empowerment", "Community Development", "Other"]}
                    onOtherChange={setOtherProgramme}
                  />
                  {otherProgramme && <TextField id="supportProgrammeOther" label="Other support/programme" />}
                </div>
                <div className="md:col-span-2">
                  <TextArea id="needsOrInterest" label="27. Briefly describe your needs or area of interest" rows={5} />
                </div>
              </Section>

              <Section number="06" title="Emergency Contact">
                <TextField id="emergencyContactName" label="28. Name" />
                <TextField id="emergencyContactRelationship" label="29. Relationship" />
                <TextField id="emergencyContactPhone" label="30. Phone Number" type="tel" />
              </Section>

              <Section number="07" title="Declaration & Consent">
                <div className="md:col-span-2 border-l-4 border-[#1a6658] bg-[#f5f8f5] p-4 md:p-5">
                  <label className="flex items-start gap-3 text-sm leading-6 text-[#344a40]">
                    <input className="mt-1 size-4 shrink-0 accent-[#1a6658] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a6658]" name="declarationConsent" type="checkbox" value="confirmed" required />
                    <span>I confirm that the information provided on this form is accurate to the best of my knowledge. I understand that UAHIN may use the information provided for legitimate membership administration, programme participation, communication, and community development purposes.</span>
                  </label>
                </div>
                <TextField id="applicantName" label="Applicant's Name" />
                <TextField id="signature" label="Signature" autoComplete="off" />
                <TextField id="declarationDate" label="Date" type="date" />
              </Section>

              <Section number="08" title="UAHIN Official Use Only" className="bg-[#f8faf8] px-4 md:px-6">
                <div className="md:col-span-2 text-sm leading-6 text-muted-foreground">
                  FOR UAHIN OFFICIAL USE ONLY. This section is for UAHIN staff and is not for the applicant to complete.
                </div>
                <InternalField label="Membership/Registration ID" />
                <InternalField label="Date Registered" />
                <InternalField label="Coordinator" />
                <InternalField label="Verification Status" value="Verified   ·   Pending   ·   Not Verified" />
                <InternalField label="Programme/Project" />
                <div className="md:col-span-2"><InternalField label="Remarks" /></div>
                <InternalField label="Authorized Officer" />
                <InternalField label="Signature" />
                <InternalField label="Date" />
              </Section>

              <div className="border-t border-[#e3e9e5] pt-7">
                <button
                  className="inline-flex min-h-12 items-center justify-center rounded-[5px] bg-[#1a6658] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#154d44] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a6658] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
                  disabled={submitting}
                  type="submit"
                >
                  {submitting ? "Submitting registration…" : "Submit Registration"}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

    </>
  );
}