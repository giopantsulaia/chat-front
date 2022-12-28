import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";

configure({
  generateMessage: localize({
    en: {
      messages: {
        required: "{field} is required",
        email: "Email is invalid",
        confirmed: "Passwords do not match!",
        min: "{field} must contain at least 0:{min} characters",
        max: "{field} must contain less than 0:{max} characters",
      },
      names: {
        last_name: "Last name",
        name: "Name",
        email: "Email",
        password: "Password",
      },
      fields: {
        password: {
          min: "password must contain at least 6 characters",
        },
      },
    },
    ka: {
      messages: {},
      fields: {},
    },
  }),
});
