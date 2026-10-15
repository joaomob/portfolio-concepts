// The footer: the brand line, the three link columns (extra attributes open the modals) and the bottom line.
// Read from the original index.html.
export const footer = {
  "text": "Physician contract review with redlines and a financial analysis. Flat $199, within 24 hours.",
  "columns": [
    {
      "heading": "Product",
      "links": [
        {
          "label": "How it works",
          "href": "#how",
          "attrs": {}
        },
        {
          "label": "Pricing",
          "href": "#pricing",
          "attrs": {}
        },
        {
          "label": "Sample review",
          "href": "#demo",
          "attrs": {}
        },
        {
          "label": "Sample report",
          "href": "#sample-report",
          "attrs": {
            "fs-modal-element": "open",
            "fs-modal-instance": "report"
          }
        },
        {
          "label": "FAQ",
          "href": "#faq",
          "attrs": {}
        }
      ]
    },
    {
      "heading": "Legal",
      "links": [
        {
          "label": "Terms of Service",
          "href": "#terms-of-service",
          "attrs": {
            "fs-modal-element": "open",
            "fs-modal-instance": "terms"
          }
        },
        {
          "label": "Privacy Policy",
          "href": "#privacy-policy",
          "attrs": {
            "fs-modal-element": "open",
            "fs-modal-instance": "privacy"
          }
        },
        {
          "label": "Cookie Policy",
          "href": "#cookie-policy",
          "attrs": {
            "fs-modal-element": "open",
            "fs-modal-instance": "cookies"
          }
        },
        {
          "label": "Cookie settings",
          "href": "#cookie-settings",
          "attrs": {
            "fs-cc": "open-preferences"
          }
        }
      ]
    },
    {
      "heading": "Contact",
      "links": [
        {
          "label": "support@redlinemd.ai",
          "href": "mailto:support@redlinemd.ai",
          "attrs": {}
        }
      ]
    }
  ],
  "disclaimer": "Redline MD provides contract analysis and is not a law firm. The report is informational and does not create an attorney-client relationship.",
  "copyright": "© 2026 RedlineMD"
};
