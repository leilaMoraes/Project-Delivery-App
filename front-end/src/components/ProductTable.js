import PropTypes from 'prop-types';
import { useContext } from 'react';
import AppContext from '../context/AppContext';

function ProductTable({ products, deleteProduct }) {
  const { toBRL } = useContext(AppContext);

  return (
    // <table style={ { width: '100%', border: '1px solid black', textAlign: 'center' } }>
    //   <thead>
    //     <tr>
    //       <th>Item</th>
    //       <th>Image</th>
    //       <th>Name</th>
    //       <th>Price</th>
    //       <th>Delete</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {products.map(({ id, name, price, urlImage }, index) => (
    //       <tr key={ id }>
    //         <td>
    //           {index + 1}
    //         </td>
    //         <td className="flex justify-center">
    //           <img src={ urlImage } alt="" width={ 25 } height={ 25 } />
    //         </td>
    //         <td>
    //           {name}
    //         </td>
    //         <td>
    //           {price}
    //         </td>
    //         <td>
    //           <button
    //             type="button"
    //             onClick={ () => deleteProduct(id) }
    //           >
    //             Delete
    //           </button>
    //         </td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
    <table
      className="table-auto border-separate border-spacing-y-1.5
      w-full sm:text-xl sm:px-2"
    >
      <thead className="mx-2">
        <tr>
          <th className="text-sm font-normal">Item</th>
          <th className="text-sm font-normal">Image</th>
          <th className="text-sm font-normal">Name</th>
          <th className="text-sm font-normal">Price</th>
          <th className="text-sm font-normal">Delete</th>
        </tr>
      </thead>
      <tbody className="m-[100px]">
        {products.map(({ id, name, price, urlImage }, index) => (
          <tr key={ id }>
            <td
              className="bg-green-light text-center font-medium p-2
rounded-l-lg w-[60px]"
            >
              {index + 1}

            </td>
            <td className="border w-[35px]">
              <img src={ urlImage } alt="" className="w-[30px] h-[35px] mx-auto" />
            </td>
            <td
              className="bg-bg0 pl-2 w-auto"
            >
              {name}

            </td>
            <td
              className="bg-blue-dark text-white text-center font-medium w-[100px]"
            >
              {toBRL(price)}

            </td>
            <td
              className="bg-blue-light text-white text-center font-medium
hover:bg-blue-hoverLgOut rounded-r-lg px-1"
            >
              <button
                type="button"
                onClick={ () => deleteProduct(id) }
                className="w-full sm:text-xl"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

  );
}
ProductTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    urlImage: PropTypes.string.isRequired,
  })).isRequired,
  deleteProduct: PropTypes.func.isRequired,
};
export default ProductTable;
