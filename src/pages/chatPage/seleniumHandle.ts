// import { Builder, By, Key, until } from 'selenium-webdriver';
// import chrome from 'selenium-webdriver/chrome';
// import { defineStore } from 'pinia';

// export const useSeleniumHandle = defineStore('seleniumHandle', {
//   state: () => ({}),
//   actions: {
//     async chatWithRobot(msg: string) {
//       const chromeDriverPath =
//         'C:/文件管理/100project/chromedriver_win32/chromedriver.exe'; // 修改为 chromedriver 的实际路径
//       const chromeOptions = new chrome.Options().setChromeBinaryPath(
//         'C:/Program Files/Google/Chrome/Application/chrome.exe'
//       );

//       const driver = await new Builder()
//         .forBrowser('chrome')
//         .setChromeOptions(chromeOptions)
//         .build();

//       try {
//         await driver.get('https://chat1.aichatos.top/');
//         await driver.wait(
//           until.elementLocated(
//             By.xpath(
//               '//button[@class="n-button n-button--default-type n-button--medium-type n-button--block n-button--dashed"]'
//             )
//           ),
//           10000,
//           'Timeout waiting for New Chat button'
//         );
//         const newChatButton = await driver.findElement(
//           By.xpath(
//             '//button[@class="n-button n-button--default-type n-button--medium-type n-button--block n-button--dashed"]'
//           )
//         );
//         await newChatButton.click();

//         const inputBox = await driver.findElement(
//           By.xpath('//textarea[@class="n-input__textarea-el"]')
//         );
//         await inputBox.sendKeys(msg);
//         const sendButton = await driver.findElement(
//           By.xpath(
//             '//button[@class="n-button n-button--primary-type n-button--medium-type"]'
//           )
//         );
//         await sendButton.click();

//         let pText = '';
//         while (pText === '') {
//           await driver.sleep(1000);
//           const pElements = await driver.findElements(
//             By.css('div.markdown-body > p')
//           );
//           if (pElements.length > 0) {
//             pText = await pElements[0].getText();
//           }
//         }

//         console.log(['p_text1', pText]);
//         const replyElements = await driver.findElements(
//           By.css('.n-input__textarea-el')
//         );
//         if (replyElements.length > 0) {
//           const res = await replyElements[0].getText();
//           console.log(res);
//           return res;
//         }
//       } finally {
//         await driver.quit();
//       }
//     },
//   },
// });
