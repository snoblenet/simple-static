# Simple Static
This is my simple static HTML publisher.
 
I use it publish HTML emails for the Wollongong Lions Juniors Australian Football Club.
 
It saves me about 45 minutes a week. This is invaluable as publishing the club newsletter is a voluntary task that I try to accomplish in a single train journey each week.
 
This tool is highly opinionated and tailored to my own needs. For example, I've:
 
- Skipped the local webserver to keep it light
- Skipped steps like JavaScript transpilation that I don't need for email publishing
- Used AppleScript for live reloading because I use a Mac and it's simpler than `gulp-liveload` IMHO
 
Feel free to adapt it to your needs.
 
## System Requirements
- Node
- Gulp (installed globally)
- Google Chrome for automatic previews 
- Mac OS X to use AppleScript to automatically reload the previews
 
## Installation
```
git clone https://github.com/snoblenet/simple-static.git
cd simple-static
npm install
```

## Commands
Type `gulp`. This:
1. Compiles `/styles/style.scss` to `/compiled/style.css`
2. Merges `/html/template.htm`, `/html/index.htm` and `/compiled/style.css`
3. Saves the result as `/compiled/index.htm`
4. Saves a date-stamped back-up of the file to `/backups/` (replacing any earlier backups that were created today)
5. Opens `/compiled/index.htm` in Google Chrome
6. Watches `/styles/style.scss`, `/html/template.htm` and `/html/index.htm` for any changes
7. Repeats steps 1 to 5 whenever one of these files changes, and then reloads the preview in Google Chrome
 
Now just edit `/styles/style.scss`, `/html/template.htm` and `/html/index.htm` as you require. Everything else happens automatically.
 
If you ever accidentally close the preview tab in Google Chrome, type `gulp open` to reopen it.
 
Type `control-C` to stop the Gulp process that watches the source files for changes.

## Author
Steven Noble
