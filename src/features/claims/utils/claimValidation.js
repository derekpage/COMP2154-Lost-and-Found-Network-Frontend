export function validateClaimForm({ verification_details }) {
  const errors = {};

  if (!verification_details || verification_details.trim().length < 20) {
    errors.verification_details =
      "Please provide at least 20 characters describing how this item is yours.";
  }

  return errors;
}
