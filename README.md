FoodID
=========

Promo video for it:
https://www.youtube.com/watch?v=hmB6wU6ghig

In-depth walkthrough:
https://www.youtube.com/watch?v=4DieBVc1WKA

An application where you input your allergies, take a picture of an ingredients label, and it'll tell you which ingredients on that list you're allergic to.

This was a freelance project I worked on while interning with Cigna, where a group and I had to develop an application using a Google tool, which in our case ended up being Google's open-source tesseract OCR.
https://code.google.com/p/tesseract-ocr/

It is currently implemented as a website/server where you upload the picture you took, the server runs OCR on the picture, and returns to you the results. 

Ideally it would be a native application, but this was just a proof-of-concept and experimentation in bringing together various technologies (node.js, MongoDB, open source tesseract-ocr from Google, jQuery Mobile, and more), especially since this was during the summer so we had a limited time to work on it. I also personally have never dabbled in native mobile development, though I plan on doing so. In other words, since it's a mobile site, any phone with a browser can run it, not to mention any computer in general can access it just for debugging purposes and we can easily download the code to anyone's computer and run it, which is ideal since we needed to give a presentation on our minimum viable product near the end of our internship and thus within our time constraints.

There's a lot more to add so I'll update this readme soon but feel free to fork it, run it, test it, etc etc
