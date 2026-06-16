@echo off
tailwindcss.exe -c tailwind.config.js -i input.css -o ../css/styles.css --minify
echo Tailwind CSS da build xong!
