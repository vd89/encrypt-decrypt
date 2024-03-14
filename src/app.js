import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import i18n from 'i18n';
import path from 'path';
import appConfig from './appConfig.js';
import apiRouters from './routes/index.js';
import { errHandler, extendedRequestMiddleware, headerFunction, notFound } from './middleware/index.js';

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

app.all('*', headerFunction);
app.use(extendedRequestMiddleware);
app.use('/api', apiRouters);

app.use(notFound);
app.use(errHandler);

export default app;
