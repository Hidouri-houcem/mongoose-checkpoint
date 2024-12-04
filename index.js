require('dotenv').config();
const mongoose = require('mongoose');


const mongoURI = process.env.MONGO_URI;

//// Connexion à la base de données
const connectToDatabase = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB"); 
    } catch (err) {
        console.error("Connection error:", err); 
    }
};
connectToDatabase();

    //schema 
    const personSchema = new mongoose.Schema({
        name: { type: String, required: true },
        age: Number,
        favoriteFoods: [String],
    });
    ////creation de model 
    const Person = mongoose.model('Person', personSchema);
    
    
    ////Créer une personne 
    const createAndSavePerson = async () => {
        try{
            const person = new Person ({
                name : "Houcem",
                age : 24,
                favoriteFoods: ["Pizza", "Pasta"],
            });


        const savedPerson = await person.save();
        console.log("Person saved:", savedPerson);
        }catch (err){
            console.error("Error saving person:", err);
        }
    };

    createAndSavePerson();



    ////Creation de plusieurs personnes 
    const createManyPeople = async () => {
        const arrayOfPeople = [
            {name : "Ali", age : 25 , favoriteFoods: ["Burger", "Fries"]},
            {name : "Mohamed" , age : 26 , favoriteFoods: ["Salad", "Steak","burritos"]},
            {name : "Mary" , age : 22 , favoriteFoods: ["Burger", "Steak","burritos"]}
        ];


        try {
            const data = await Person.create(arrayOfPeople);
            console.log("Personnes ajoutées :", data);
        }catch (err){
            console.error("Erreur lors de l'ajout des personnes :", err);
        }
    };
    createManyPeople();




    ////recherche par nom 
    const findPeopleByName = async (name) =>{
        try{
            const data = await Person.find({name});
            console.log("Personnes trouvées :", data);
        }catch (err){
            console.error("Erreur lors de la recherche des personnes :", err);
        }
    };

    findPeopleByName("Ali");




    ////recherche par ID 
    const findPeopleById = async(personId) => {
        try{
            const person = await Person.findById(personId);
            if (!person) {
                console.log("Personne non trouvée");
            } else {
                console.log(`Personne trouvée par son Id ${personId}:`, person);
            }
        }catch (err) {
            console.error("Erreur lors de la recherche de la personne par ID:", err);
        }
    };

    findPeopleById('674e16837075d1f92ff0c5e1');

////trouver une personne avec Id et ajouter hamburger a favoriteFoods
    const updatePersonFavoriteFoods = async(personId) => {
        try{
            const person = await Person.findById(personId);
            if (!person){
                console.log("Personne non trouvée");
                return;
            }

            person.favoriteFoods.push("hamburger");



            const updatedPerson = await person.save();
            console.log("Personne mise à jour(ajout de hamburger):", updatedPerson);
        }catch (err) {
        console.error("Erreur lors de la mise à jour de la personne:", err);
    }
    };
    updatePersonFavoriteFoods('674f169317b895fbca451d65');



////trouver une personne avec Id et changer son age en 20
const updatePersonAgeByName = async(personName) => {
    try{
        updatedPerson = await Person.findOneAndUpdate(
            {name : personName},
            {age: 20},
            {new: true}
        );
        console.log("Personne mise à jour(age = 20):", updatedPerson);
    }catch (err) {
        console.error("Erreur lors de la mise à jour:", err);
    }
};
updatePersonAgeByName("Ali");



////supprimer une personne par Id 
const deletePersonById = async (personId) => {
    try{
        const deletedPerson = await Person.findByIdAndDelete(personId);
        console.log("Personne supprimée:", deletedPerson);
    }catch (err) {
        console.error("Erreur lors de la suppression:", err);
    }
};
deletePersonById("674f169317b895fbca451d65");



////supprimer toutes les personnes ayant le nom "Mary"
const deleteManyPeopleByName = async (name) => {
    try {
        const result = await Person.deleteMany({ name });
        console.log("Résultat de la suppression :", result);
    } catch (err) {
        console.error("Erreur lors de la suppression :", err);
    }
};
deleteManyPeopleByName("Ali");


////trouver les personnes qui aiment les burritos

const findAndFilterPeople = async () => {
    try {
        const results = await Person.find({ favoriteFoods: "burritos" })
            .sort({ name: 1 }) 
            .limit(2)          
            .select("-age")    
            .exec();
        console.log("Résultats filtrés (aiment les burritos) :", results);
    } catch (err) {
        console.error("Erreur lors de la recherche :", err);
    }
};
findAndFilterPeople();