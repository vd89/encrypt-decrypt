import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import i18n from 'i18n';
import path from 'path';
import apiRouters from './routes/index.js';
import appConfig from './appConfig.js';

const app = express();
const { availableLocals, defaultLanguage, projectRoot } = appConfig;
i18n.configure({
  locales: availableLocals,
  directory: path.join(projectRoot, 'src', 'locals'),
  defaultLocale: defaultLanguage,
});

app.use(i18n.init);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use(morgan('combined'));
app.use(apiRouters);

export default app;
