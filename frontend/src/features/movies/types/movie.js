export class Movie {
  constructor({ id, title, price }) {
    this.id = id;
    this.title = String(title);
    this.price = Number(price);
  }

  static fromDto(dto) {
    return new Movie({
      id: dto.id,
      title: dto.title,
      price: dto.price,
    });
  }
}
