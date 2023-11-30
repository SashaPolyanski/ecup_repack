import {access, mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {google} from 'googleapis';

const config = {
  spreadsheetId: '1UWvrgTWW9kz5NZHUM8-CFyhIzWecNT_hJVYLdcpRd6I',
  key: 'AIzaSyCAO4VtHIuJWL6rAJuJGyf0-s0IDadbxok',
};

const localesPath = 'public/locales';

const downloadTranslations = async () => {
  const sheet = google.sheets({
    version: 'v4',
    key: config.key,
  });

  const lists = await sheet.spreadsheets.get(config);

  const values = await sheet.spreadsheets.values.batchGet({
    ...config,
    ranges: lists.data.sheets
      .map((sheet) => !sheet.properties.title.startsWith('!') && `${sheet.properties.title}!A:Z`)
      .filter((name) => !!name),
  });
  try {
    await access(localesPath);
  } catch {
    await mkdir(localesPath);
  }

  const langs = values.data.valueRanges[0].values[0].slice(1);
  const locales = {};

  await Promise.all(
    langs.map(async (lang) => {
      const langPath = path.join(localesPath, lang);
      locales[lang] = {};
      try {
        await access(langPath);
      } catch {
        await mkdir(langPath);
      }
    }),
  );

  await Promise.all(
    values.data.valueRanges.map(({values, range}) =>
      Promise.all(
        langs.map(async (lang, index) => {
          const d = JSON.stringify(
            Object.fromEntries(
              values
                .slice(1)
                .map(([key, ...other]) => [key, other[index]])
                .filter(([key]) => key),
            ),
            undefined,
            2,
          );
          locales[lang][`${range.split('!')[0]}`] = Object.fromEntries(
            values
              .slice(1)
              .map(([key, ...other]) => [key, other[index]])
              .filter(([key]) => key),
          );

          const localePath = path.join(localesPath, lang, `${range.split('!')[0]}.json`);
          await writeFile(localePath, d);
        }),
      )),
  );
  await Promise.all(
    Object.entries(locales).map(async ([lang, data]) => {
      const localePath = path.join(localesPath, lang, 'index.json');
      await writeFile(localePath, JSON.stringify(data, undefined, 2));
    }),
  );
  console.log('✅ locales downloaded successfully.');

  return true;
};

downloadTranslations();
