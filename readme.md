# IronPulse Fitness

A responsive, single-page marketing website for **IronPulse Fitness**, a fictional premium gym and personal training studio in Austin, TX.

## Description

IronPulse Fitness is a front-end website that presents a gym's programs, trainers, membership pricing, gallery and contact details in one scrolling page. It is useful as a portfolio project, or as a starting template for a gym or fitness studio website. It solves the problem of giving prospective members everything they need (what is offered, what it costs, how to get in touch) in one clear place.

## Features

- Sticky navigation bar with scroll progress bar, active-section highlighting and smooth scrolling
- Mobile hamburger menu with full-screen overlay
- Hero section with typing-text animation and animated stat counters
- Scroll-reveal animations (respects the `prefers-reduced-motion` setting)
- About section with mission, vision and "Why Choose Us" highlights
- Eight training program cards (Strength, Weight Loss, CrossFit, Yoga, Bodybuilding, Cardio, Functional Training, HIIT)
- Trainer profiles with social icon hover effects
- Three-tier pricing section (Basic, Standard, Premium)
- BMI calculator (metric: cm and kg) with category, scale pointer and advice
- Membership benefits section
- Image gallery with lightbox (click, arrow keys and Escape supported)
- Success stories and an auto-playing testimonial slider
- FAQ accordion
- Contact form with client-side validation and an embedded OpenStreetMap
- Newsletter sign-up field and back-to-top button
- SEO tags, Open Graph / Twitter Card tags and Schema.org (`ExerciseGym`) markup
- Fully responsive layout (desktop, tablet, mobile)

> **Note:** The contact form and newsletter form only validate input in the browser. They do not send data anywhere because there is no backend yet.

## Technologies Used

- HTML5
- CSS3 (custom properties, Grid, Flexbox, animations)
- Vanilla JavaScript (no frameworks)
- [Font Awesome 6.5.1](https://fontawesome.com/) (icons, loaded from CDN)
- [Google Fonts](https://fonts.google.com/): Anton and Manrope (loaded from CDN)
- [Unsplash](https://unsplash.com/) (images, loaded by URL)
- [OpenStreetMap](https://www.openstreetmap.org/) (embedded map)

## Project Structure

```text
ironpulse-fitness/
├── index.html
├── style.css
├── script.js
├── README.md
└── .gitignore
```

There is no `assets/` folder yet because all images, icons and fonts are loaded from the internet (CDNs and Unsplash URLs). If you later add your own local images, put them in `assets/images/`.

## How to Run

No installation or build step is needed.

**Easiest way (VS Code):**

1. Open the project folder in VS Code.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and choose **Open with Live Server**.

**Even simpler:** double-click `index.html` to open it in your browser.

An internet connection is required so the fonts, icons and images can load.

## Usage

- Scroll through the page or use the top menu to jump to a section.
- Use the **BMI** section: enter height (cm) and weight (kg), then click **Calculate BMI**.
- Click any gallery image to open it larger; use the arrows or keyboard to move between images.
- Open the FAQ questions to read the answers.
- Fill in the contact form to see the validation messages and the success message.

## Screenshots

_Screenshots coming soon._

## Live Demo

Live Demo: Not deployed yet

## Future Improvements

- Connect the contact and newsletter forms to a real backend or a form service
- Replace the placeholder contact details, testimonials and stock photos with real content
- Host the images locally in an `assets/images/` folder so the site works without relying on external image URLs
- Add an imperial (lbs / ft) option to the BMI calculator
- Add a class timetable and online membership sign-up
- Update the canonical URL and Open Graph URLs once the site has a real domain

## Author

Created by Arshdeep Singh