export const generateSearchFilterParams = (
  dateStart: number,
  dateEnd: number
) => {
  return !!dateStart || !!dateEnd
    ? [
        {
          range: {
            date_start: { gte: dateStart !== 0 ? dateStart : null },
          },
        },
        {
          range: {
            date_end: { lte: dateEnd !== 0 ? dateEnd : null },
          },
        },
      ]
    : {};
};

export const generateSearchMustParams = (
  artistTitle: string,
  artTitle: string,
  galleryTitle: string,
  artistLocation: string,
  dateDisplay: number,
  isBoosted: boolean
) => {
  return [
    artistTitle ? { match: { artist_title: artistTitle } } : null,
    artTitle ? { match: { title: artTitle } } : null,
    galleryTitle ? { match: { title: galleryTitle } } : null,
    artistLocation ? { match: { place_of_origin: artistLocation } } : null,
    dateDisplay !== 0 ? { match: { date_display: dateDisplay } } : null,
    isBoosted === true ? { match: { is_boosted: isBoosted } } : null,
  ].filter(Boolean);
};
