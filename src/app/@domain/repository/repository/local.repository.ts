

export abstract class LocalRepository {
  abstract setLocale(localeId: string):any;
  abstract getLanguageCode(): string;
}
