const createLiker=()=> {
  rating=0;
  return {
    like() {
      rating+=1;
      return this;
    },
    dislike() {
      rating-=1;
      return this;
    },
    val() {
      return rating;
    }
  }
}