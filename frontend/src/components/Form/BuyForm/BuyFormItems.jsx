import { useFieldArray, useFormContext, useFormState, useWatch } from "react-hook-form";
import CustomSelect from "../Control/CustomSelect";
import { useEffect, useState } from "react";
import { itemsGetAll } from "../../../data/items";
import TextFieldset from "../Control/TextFieldset";

const emptyOption = { value: 0, text: "Select an item", icon: 0, desc: "Select the best item that you may wonder." };
export default function BuyFormItems() {
  const [itemsList, setItems] = useState([])
  const [opts, setOpts] = useState([])
  useEffect(() => {
    itemsGetAll().then((data) => {
		const tempOptions = data.items.map((x) => ({
			value: x.id,
			icon: x.icon,
			text: x.title,
			desc: x.description.slice(0, 15),
		}))
		setItems(data.items)
    	setOpts([emptyOption, ...tempOptions])
	}).catch((err) => {
		console.log("Error while fetching items in BuyFormItems component", err);
	})

  }, [])

	const { register, getValues, setValue, trigger, control } = useFormContext();
	const { fields, append, remove } = useFieldArray({ name: "items", control });
	const totalQuantity = fields.reduce((sum, item) => sum + (item.quantity || 0), 0);
	const { errors } = useFormState({ name: "items" });

	const onRowAdd = (e) => {
		e.preventDefault();
		console.log(fields);
		append({ itemId: 0, title: "", price: 0, quantity: 0, totalPrice: 0 });
 	}

	const onRowDelete = (e, itemId) => {
		e.preventDefault();
		remove(itemId);
  	}

  const onItemIdChange = (
    e,
    rowIndex
  ) => {
    const id = parseInt(e.currentTarget.value);
    let existingItem;
    if (id == 0) existingItem = emptyOption;
    else existingItem = itemsList.find((x) => x.itemId == id);
	const price = existingItem.price;
	const title = existingItem.title;
    setValue(`items.${rowIndex}.price`, price);
    setValue(`items.${rowIndex}.title`, title);
	if (fields && fields[rowIndex].quantity == 0)
    	setValue(`items.${rowIndex}.quantity`, 1);
    updateRowTotalPrice(rowIndex);
  }

	const updateRowTotalPrice = (index) => {
		const { price, quantity } = getValues(`items.${index}`)
		let totalPrice = 0
		if (quantity && quantity > 0) totalPrice = price * quantity
		setValue(
		`items.${index}.totalPrice`,
		parseFloat(totalPrice.toFixed(2))
		)
	}


  return (

      <table id="form-food-items" className="table table-borderless table-hover">
        <thead>
          <tr>
            <th className="text-start">Items</th>
            <th className="text-start">Title</th>
            <th className="text-start">Unit</th>
            <th>Quantity</th>
            <th className="">Price</th>
            <th>
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={onRowAdd}
              >
                + Add
              </button>
            </th>
          </tr>
        </thead>
		<tbody>
			{fields.map((f, index) => {
				return (
					<tr key={f.id}>
						<td>
							<CustomSelect
							opts={opts} 
							{...register(`items.${index}.itemId`, {
								valueAsNumber: true,
								min: {
									value: 1,
									message: "Select Item.",
								},
								onChange: (e) => {
									onItemIdChange(e, index);
									trigger(`items.${index}.quantity`);
								}
							})}
							>
							</CustomSelect>
						</td>
						<td>
							<span>{getValues(`items.${index}.title`)}</span>
						</td>
						<td>
							<span>{"$" + getValues(`items.${index}.price`)}</span>
						</td>
						<td>
							<TextFieldset
							type="number"
							normal={true}
							clazz={''}
							{...register(`items.${index}.quantity`)}
							></TextFieldset>
						</td>
						<td>
							<span>{"$" + getValues(`items.${index}.totalPrice`)}</span>
						</td>
						<td>
							<button type="button" className="btn btn-danger" onClick={(e) => onRowDelete(e, index)}>X</button>
						</td>
					</tr>
				)
			})}
		</tbody>
        <tfoot>
          {fields && fields.length > 0 && (
            <tr className="border-top">
              <td colSpan={2}></td>
              <td colSpan={2}><span className="fw-bold">Total</span></td>
              <td className="text-start align-middle">
				<span className="fw-bold">
					{"$" + totalQuantity}
				</span>
              </td>
            </tr>
          )}
          {errors.items?.root && (
            <tr>
              <td colSpan={5}>
                <span className="error-feedback">
                  {errors.items?.root?.message}
                </span>
              </td>
            </tr>
          )}
        </tfoot>
      </table>
  );
}
