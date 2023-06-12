// @ts-check

/**
 *
 * @param {import("next/image").ImageLoaderProps} param0
 * @returns {string}
 */
const sanityLoader = ({ src, width, quality }) => {
  const url = new URL(
    "https://cdn.sanity.io/images/jybicrgu/production/e862d9343dc032e09ccee64ff7e645d563c5a683-1080x1080.jpg"
  );
  if (width) url.searchParams.set("w", `${width}`);
  if (quality) url.searchParams.set("q", `${quality}`);

  return url.toString();
};

export default sanityLoader;
