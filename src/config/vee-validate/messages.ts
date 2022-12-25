import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";

configure({
  generateMessage: localize({
    en: {
      messages: {
        required: "{field} is required",
        email: "Email is not valid",
        confirmed: "Passwords do not match!",
      },
      fields: {},
    },
    ka: {
      messages: {},
      fields: {},
    },
  }),
});
