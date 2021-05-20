class Doctor {
  constructor(id, doc) {
    this.id = id;
    this.name = doc.name;
    this.phone = doc.phone;
    this.email = doc.email;
    this.age = doc.age;
    this.city = doc.city;
    this.experience = doc.experience;
    this.field = doc.field;
    this.hospital = doc.hospital;
    this.imageUrl = doc.imageUrl;
    this.isVerified = doc.isVerified;
    this.clinicId = doc.clinicId;
  }
}

export default Doctor;
