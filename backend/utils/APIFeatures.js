class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginate(maxLimit) {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || maxLimit;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
module.exports = APIFeatures;
