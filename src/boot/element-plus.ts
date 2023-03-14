import { boot } from 'quasar/wrappers';
import ElementUI from 'element-plus';
import 'element-plus/dist/index.css';
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // something to do
  app.use(ElementUI);
});
export { ElementUI };
