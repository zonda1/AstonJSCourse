const createPerson=({...obj})=>{
  const {name='New User',skills=[]}=obj;
  const newObj={
    name,
    skills,
    addName(value) {
      this.name=value;
      return this;
    },
    addSkill(value) {
      const set=new Set(this.skills);
      set.add(value);
      this.skills=Array.from(set);
      return this;
    },
    removeSkill(value) {
      this.skills=this.skills.filter(el=>el!=value);
      return this;
    }
  }
  return Object.seal({...obj,...newObj});
}