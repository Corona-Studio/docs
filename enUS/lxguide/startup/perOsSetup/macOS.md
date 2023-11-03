# Special settings for macOS

For macOS users, if you see a "Corrupted" error pop-up when opening LauncherX, please do the following:

- Open "Terminal.app"
- Open your Finder and find your LauncherX executable (LauncherX.app or LauncherX.Avalonia.app)
- Enter `sudo xattr -d com.apple.quarantine` in the terminal BUT DON'T HIT ENTER YET!
- As long as there is a space at the end of the above command, drag your **LauncherX APP** into the terminal window
- Now hit enter, the terminal will ask you to enter the password of the administrator account. Please enter it according to your feelings since the terminal will not display any input records in the display area.
- After typing the password, press `Enter` on the keyboard to confirm. There will be no prompt if the execution is successful.
- Then try launching LauncherX again, and if it fails again, be sure to give us feedback at [LXIT (GitHub)](https://github.com/Corona-Studio/LXIT).