Crop image to width: 410px & height: 586px without loosing image content;
Take svg Bondora logo from https://www.bondora.ee/ and put it into top left corner with original site sizes;
Use existing "Clipping" line to change part of logo color to Red 125, Green 83, Blue 222;
Save image without white background;
Apply maximum compression for web without loosing quality (add WebP version);
Create version for hiDPI devices;
Add <div> with background-image (use your compressed files) & width=410px, height=586px;
On mobile: width should be 100% & height calculated automaticaly;
Add javascript to check if current browser supports `WebP` format (if supported: apply it as background-image).
