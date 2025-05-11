interface BaseModel {
  id: string;
}

class BaseModelImplementation implements BaseModel {
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}

export { BaseModel, BaseModelImplementation };
