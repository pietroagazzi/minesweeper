# Minesweeper in React 🚩

[![MineSweeper](https://i.postimg.cc/XqfJGk1N/Screenshot-2023-10-15-at-14-58-55-Mine-Sweeper.png)](https://postimg.cc/QKMsv1rv)

The classic Minesweeper game built with React. Play
it [here](https://codesandbox.io/p/github/pietroagazzi/minesweeper/main?import=true&layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522clnrha1gu0007286725upzxpe%2522%252C%2522sizes%2522%253A%255B70%252C30%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522clnrha1gu00032867r3ms6fz0%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522clnrha1gu000528673zimwdi1%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clnrha1gu000628678u5f9tx2%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B60%252C40%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clnrha1gu00032867r3ms6fz0%2522%253A%257B%2522id%2522%253A%2522clnrha1gu00032867r3ms6fz0%2522%252C%2522tabs%2522%253A%255B%257B%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fsrc%252FApp.js%2522%252C%2522id%2522%253A%2522clnrhag8y00i22867c3b3ke72%2522%252C%2522mode%2522%253A%2522temporary%2522%257D%255D%252C%2522activeTabId%2522%253A%2522clnrhag8y00i22867c3b3ke72%2522%257D%252C%2522clnrha1gu000628678u5f9tx2%2522%253A%257B%2522id%2522%253A%2522clnrha1gu000628678u5f9tx2%2522%252C%2522activeTabId%2522%253A%2522clnrhciaq00s128672d5emwqy%2522%252C%2522tabs%2522%253A%255B%257B%2522type%2522%253A%2522TASK_PORT%2522%252C%2522taskId%2522%253A%2522start%2522%252C%2522port%2522%253A3000%252C%2522id%2522%253A%2522clnrhciaq00s128672d5emwqy%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522path%2522%253A%2522%252F%2522%257D%255D%257D%252C%2522clnrha1gu000528673zimwdi1%2522%253A%257B%2522id%2522%253A%2522clnrha1gu000528673zimwdi1%2522%252C%2522activeTabId%2522%253A%2522clnrha2v7008g2867n2agu7q0%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clnrha1gu00042867sirbobb1%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TERMINAL%2522%252C%2522shellId%2522%253A%2522clnrha1o80010e5egguab7pbp%2522%257D%252C%257B%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522start%2522%252C%2522id%2522%253A%2522clnrha2v7008g2867n2agu7q0%2522%252C%2522mode%2522%253A%2522permanent%2522%257D%252C%257B%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522CSB_RUN_OUTSIDE_CONTAINER%253D1%2520devcontainer%2520templates%2520apply%2520--template-id%2520%255C%2522ghcr.io%252Fdevcontainers%252Ftemplates%252Fjavascript-node%255C%2522%2520--template-args%2520%27%257B%257D%27%2520--features%2520%27%255B%255D%27%2522%252C%2522id%2522%253A%2522clnrha9sc00bh2867ozs3you2%2522%252C%2522mode%2522%253A%2522permanent%2522%257D%255D%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D)

## Play

- 🟦 Click on a square to reveal it. If it's a mine, you lose! If it's a number, it tells you how many mines are adjacent
  to it.
- 🚩 Right-click on a square to flag it if you think it's a mine.
- 💣 Flag all the mines to win!

## Run

1. Clone this repository

  ```shell
  git clone git@github.com:pietroagazzi/minesweeper.git
  ```

2. Install dependencies

  ```shell
  npm install
  ```

3. Run the app

  ```shell
  npm start
  ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Contributing

Contributions are welcome! If you have any questions, please open an issue.

You can also contribute by adding features to the game. Here are some ideas:

- Add a timer to keep track of how long it takes to win
- Add a leaderboard to keep track of the fastest times
- Add a difficulty setting to change the size of the board and the number of mines

If you want to contribute, follow these steps:

1. Fork this repository
2. Create a new branch (e.g. `feature/my-new-feature`)
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the terms of the [MIT license](./LICENSE).

## Authors

- [@pietroagazzi](https://www.github.com/pietroagazzi) 

---

Thanks for playing! 🎉