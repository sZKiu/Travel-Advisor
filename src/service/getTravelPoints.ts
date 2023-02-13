export default function getTravelPoints(data: any) {
  let newData = data.map((el: any, i: number) => {
    if (el.address) {
      return {
        address: el.address,
        isClosed: el.open_now_text,
        rating: el.rating,
        name: el.name,
        distance: el.distance_string,
        email: el.email,
        reviews: el.num_reviews,
        img: el?.photo?.images?.large?.url,
        phone: el.phone,
        priceLevel: el.price_level,
        ranking: el.ranking,
        web: el.web_url,
        webReview: el.write_review,
        lat: el.latitude,
        lng: el.longitude,
      };
    } else {
      return null;
    }
  });

  newData = newData.filter((el: any) => el !== null);

  return newData;
}
