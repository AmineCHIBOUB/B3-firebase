import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs, doc, addDoc, deleteDoc,onSnapshot, query} from 'firebase/firestore'

console.log('Start du programme v1 !');

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const q = query(collection(db, "factures"));
onSnapshot(q,(snapshot)=>{
    let factures=[];
    snapshot.docs.forEach((doc)=>{
        factures.push({...doc.data(),id:doc.id})
    })
    afficheFactures(factures);
})

// const getFactures = async (db) => {
//     const facturesCol = collection(db, 'factures');
//     const facturesSnapshot = await getDocs(facturesCol);
//     const factures = facturesSnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
//     return factures;
// }

const afficheFactures = (factures) => {
    const rootEl = document.querySelector('#root');
    const ulEl = document.createElement('ul');
    factures.map(facture => {
        const liEl = document.createElement('li');
        liEl.innerHTML = facture.id + " <button class='deleteFacture' data-id='"+facture.id+"'>delet</button>";
        ulEl.appendChild(liEl);
    });

    rootEl.innerHTML='';
    rootEl.appendChild(ulEl);

    const buttonsDelete = document.querySelectorAll('.deleteFacture');
    buttonsDelete.forEach(button => {
        button.addEventListener('click', async (event) => {
            console.log('click');
            if (confirm('Etes vous sur de vouloir supprimer cette facture ?')) {
                console.log(event.target.getAttribute('data-id'));
                await deleteDoc(doc(db, "factures", event.target.getAttribute('data-id')));
            }
        });
    });
}





// const factures = await getFactures(db);
// afficheFactures(factures);



const formEl = document.querySelector('#formAdd form');
formEl.addEventListener('submit', async (event) => {
    event.preventDefault();

    await addDoc(collection(db, "factures"), {
        number: event.target[0].value,
        totalTTC: event.target[1].value
    });
});





































// import { initializeApp } from "firebase/app";
// import {getFirestore, collection, getDocs} from 'firebase/firestore'

// console.log('Start du programme v1 !');

// const firebaseConfig = {
//     apiKey: process.env.apiKey,
//     authDomain: process.env.authDomain,
//     projectId: process.env.projectId,
//     storageBucket: process.env.storageBucket,
//     messagingSenderId: process.env.messagingSenderId,
//     appId: process.env.appId
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// const getFactures = async (db) => {
//     const facturesCol = collection(db, 'factures');
//     const facturesSnapshot = await getDocs(facturesCol);
//     const factures = facturesSnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
//     return factures;
// }

// const afficheFactures = (factures) => {
//     const rootEl = document.querySelector('#root');
//     const ulEl = document.createElement('ul');
//     factures.map(facture => {
//         const liEl = document.createElement('li');
//         liEl.innerHTML = facture.id + " <button class='deleteFacture' data-id='"+facture.id+"'>delete</button>";
//         ulEl.appendChild(liEl);
//     });
  

//     const buttonsDelete = document.querySelectorAll('#deleteFacture button');
//     buttonsDelete.forEach(button => {
//         button.addEventListener('click', (event) => {
//             console.log('click');
//             console.log(event.target.getAttribute('data-id'));
//         });
//     });
//     rootEl.appendChild(ulEl);
  
// }

// const factures = await getFactures(db);
// afficheFactures(factures);

// // recuperattion des info de formulaire
// const formEl=document.querySelector('#formAdd form')
// formEl.addEventListener('submit',(e)=>{
//     e.preventDefault();
//     console.log('submit add form',e.target[0].value , e.target[1].value)
// })