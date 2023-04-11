 import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

class App extends React.Component {

  constructor () {
    super();
    this.state = {
      products: [
      //   {
      //     price: 99,
      //     title: 'Watch',
      //     qty: 1,
      //     img: 'https://imgs.search.brave.com/0fKQ7M2ksBKCtDGnb9sS9uJzJBU3VpVJypEyajyQBGo/rs:fit:1000:1000:1/g:ce/aHR0cHM6Ly9hZTAx/LmFsaWNkbi5jb20v/a2YvSFRCMTZUVy5Q/VlhYWFhhRlhWWFhx/NnhYRlhYWEsvRmFz/aGlvbi1zaW1wbGUt/c3R5bGlzaC1Ub3At/THV4dXJ5LWJyYW5k/LU1FR0lSLVdhdGNo/ZXMtbWVuLVN0YWlu/bGVzcy1TdGVlbC1N/ZXNoLXN0cmFwLWJh/bmQtUXVhcnR6LXdh/dGNoLmpwZw',
      //     id: 1
      //   },
      //   {
      //     price: 999,
      //     title: 'Mobile Phone',
      //     qty: 10,
      //     img: 'https://imgs.search.brave.com/71L_vRt28UNXxjY-WmGqL1ahs2NJKAf0xx8cf9Xsgjg/rs:fit:1200:1200:1/g:ce/aHR0cDovL3RlY2hi/ZWF0LmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAxMy8wMS9T/bWFydHBob25lLmpw/Zw',
      //     id: 2
      //   },
      //   {
      //     price: 999,
      //     title: 'Laptop',
      //     qty: 4,
      //     img: 'https://imgs.search.brave.com/V1kyIc39pcUQvgi07xG1eLTXRJovbiRKPEKFlCo3jwc/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5Y/OEtVM21mbUt4MnQ4/d1MybER4WWJBSGFI/YSZwaWQ9QXBp',
      //     id: 3
      //   }
       ]
    }
    // this.increaseQuantity = this.increaseQuantity.bind(this);
    // this.testing();
    this.db=firebase.firestore();
  }


componentDidMount(){
  //  firebase
  //      .firestore()
  //      .collection('products')
  //      .get()
  //      .then((snapshot)=>{
  //       console.log(snapshot);
  //       snapshot.docs.map((doc)=>{
  //         console.log(doc.data());
  //       })

  //       const products=snapshot.docs.map((doc)=>{
  //         const data=doc.data();
  //         data['id']=doc.id;
  //         return data;
  //       })
  //       this.setState({
  //         products:products
  //       })
  //      })

      this.db
       .collection('products')
       .onSnapshot((snapshot)=>{
        console.log(snapshot);
        snapshot.docs.map((doc)=>{
          console.log(doc.data());
        })

        const products=snapshot.docs.map((doc)=>{
          const data=doc.data();
          data['id']=doc.id;
          return data;
        })
        this.setState({
          products:products
        })
       })
        

  

}



  handleIncreaseQuantity = (product) => {
    console.log('Heyy please inc the qty of ', product);
    const { products } = this.state;
    const index = products.indexOf(product);

    // products[index].qty += 1;

    // this.setState({
    //   products
    // })
    const DocsRef=this.db.collection('products').doc(products[index].id);
    DocsRef
      .update({
        qty: products[index].qty+1
      }) 
      .then(()=>{
        console.log('Updated Successfully');
      })
      .catch((error)=>{
        console.log('Error :',error);
      })
  }
  handleDecreaseQuantity = (product) => {
    console.log('Heyy please inc the qty of ', product);
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    // products[index].qty -= 1;

    // this.setState({
    //   products
    // })
    const DocsRef=this.db.collection('products').doc(products[index].id);
    DocsRef
      .update({
        qty: products[index].qty-1
      }) 
      .then(()=>{
        console.log('Updated Successfully');
      })
      .catch((error)=>{
        console.log('Error :',error);
      })



  }
  handleDeleteProduct = (id) => {
    const { products } = this.state;

    // const items = products.filter((item) => item.id !== id); // [{}]

    // this.setState({
    //   products: items
    // })

    const DocsRef=this.db.collection('products').doc(id);
  DocsRef
     .delete()
     .then(()=>{
      console.log('Deleted Successfully');
    })
    .catch((error)=>{
      console.log('Error :',error);
    })
     

  }

  getCartCount = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    })

    return count;
  }

  getTotalCount=()=>{
    const {products}=this.state;
    let Carttotal=0;
    products.map((product)=>{
       Carttotal=Carttotal+product.qty*product.price;
    })
 return Carttotal;
  }
  
  // addProduct=()=>{
  //     this.db
  //      .collection('products')
  //      .add({
  //       img: '',
  //       price: 900,
  //       qty:3,
  //       title: 'washing machine'
  //      })
  //      .then((docRef)=>{
  //           console.log( 'Product has been added ' , docRef);
  //      })
  //      .catch((error)=>{
  //             console.log('Eror :',error)
  //      })
  // }

  render () {
    const { products } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        {/* <button onClick={this.addProduct} style={{padding:'20',fontSize:'20'}}>Add a Product</button> */}
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        <div style={{padding:10, fontSize:25}}>TOTAL: {this.getTotalCount()}</div>
      </div>
    );
  }
}

export default App;
