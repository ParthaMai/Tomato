import { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios" // This is for store the data in backend
import { toast } from 'react-toastify'
 /* this is add a notification when success fully add item  */

const Add = ({url}) => {

  const [image, setImage] = useState(false);
  const [data,setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"Salad"
  })
   {/* this is for input the data in useSTate */}
  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}));
    
  }

  // this is for check in console the data is working or not
  // useEffect(()=>{
  //   console.log(data);
  // },[data])

  const onSubmitHandler = async (event) =>{
    event.preventDefault(); // for this the page is do not refresh after click add
    const formData = new FormData();
    formData.append("name",data.name);
    formData.append("description",data.description);
    formData.append("price",Number(data.price)) // price is string but we store price is in backend number, so convert into number
    formData.append("category",data.category)
    formData.append("image",image);
    // this is how to store data in MongoDB by backend
    const response = await axios.post(`${url}/api/food/add`,formData);
    if(response.data.success){ // this is for when we add data the form is empty
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad"
      })
      setImage(false);
      toast.success(response.data.message); {/* this is add a notification when success fully add item */}
    }
    else{
      toast.error(response.data.message);
    }
  }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor='image'> {/* this htmlFor='image' is linked in input id='image' */}
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input
            type="file"
            id="image"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type Here' />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name='description' rows='6' placeholder='wirte content here' required>

          </textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input onChange={onChangeHandler} value={data.price} type="number"  name='price' placeholder='₹20' />
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>

    </div>
  )
}

export default Add
