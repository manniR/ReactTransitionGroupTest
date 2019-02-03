export default class DateService {
  public getCategories = (): Promise<[]> => {
    return [
      {
        id: 1,
        title: "First Cat"
      },
      {
        id: 2,
        title: "Second Cat"
      }
    ];
  };

  public getEvents = (): Promise<[]> => {
    return [
      {
        id: 1,
        catId: 1,
        title: `First Event`
      },
      {
        id: 2,
        catId: 1,
        title: "Second Event"
      },
      {
        id: 3,
        catId: 1,
        title: "Third Event"
      },
      {
        id: 4,
        catId: 2,
        title: "Fourth Event"
      },
      {
        id: 5,
        catId: 2,
        title: "Fifth Event"
      }
    ];
  };
}
