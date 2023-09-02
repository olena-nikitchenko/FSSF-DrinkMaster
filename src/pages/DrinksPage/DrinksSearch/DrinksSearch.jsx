
import { useState } from "react";
import PropTypes from "prop-types";
import css from "./DrinksSearch.module.scss";
import icons from "../../../images/icons.svg";
import Select from "react-select";
import { stylesDrink } from "./drinkSelectStyle";

const DrinksSearch = ({ onSearch, categoriesList, ingredientsList }) => {
	const [chosenCategory, setChosenCategory] = useState(null);
	const [chosenIngredient, setChosenIngredient] = useState(null);
	// const [searchText, setSearchText] = useState('');
	const [searchText, searchWord] = useState("");

	const handleSearchClick = () => {
		onSearch({ category: chosenCategory, ingredient: chosenIngredient, searchWord });
  };
  

	return (
		<div className={css.wrapper}>
			<form
				// onSubmit={}
				className={css.form}
			>
				<input
          type="text"
					className={css.input}
					placeholder="Enter the text"
					value={searchText}
					onChange={e => searchWord(e.target.value)}
				/>
				<button
					type="submit"
					className={css.submit} onClick={handleSearchClick}
				>
					<div
						className={css.hoverWrapper}
						
					></div>
						<svg className={css.iconDgink} width="18"
						height="18">
							<use href={icons + "#search"}></use>
						</svg>
					
				</button>
			</form>
      <Select
       
				options={categoriesList.map(category => {
					console.log(category);
					return { label: category };
				})}
				placeholder="All categories"
				value={chosenCategory}
        onChange={e => setChosenCategory(e.target)}
        styles={stylesDrink}
        unstyled
        required
			/>
      <Select
        
				options={ingredientsList.map(ingredient => {
					return { value: ingredient._id, label: ingredient.title };
				})}
				placeholder="Ingredients"
				value={chosenIngredient}
        onChange={selectedOption => setChosenIngredient(selectedOption)}
        styles={stylesDrink}
        unstyled
        required
			/>
		</div>
	);
};

DrinksSearch.propTypes = {
	onSearch: PropTypes.func.isRequired,
	categoriesList: PropTypes.array.isRequired,
	ingredientsList: PropTypes.array.isRequired,
};

export default DrinksSearch;

// import { useState } from "react";
// import PropTypes from "prop-types";
// import styles from "./DrinksSearch.module.scss";
// import icons from "../../../images/icons.svg";
// import Select from "react-select";

// const DrinksSearch = ({ onSearch, categoriesList, ingredientsList }) => {
// 	const [chosenCategory, setChosenCategory] = useState(null);
// 	const [chosenIngredient, setChosenIngredient] = useState(null);
// 	// const [searchText, setSearchText] = useState('');
// 	const [searchText, searchWord] = useState("");

// 	const handleSearchClick = () => {
// 		onSearch({ category: chosenCategory, ingredient: chosenIngredient, searchWord });
// 	};

// 	return (
// 		<div className={styles.SearchFormStyled}>
// 			<form
// 				// onSubmit={}
// 				className={styles.QueryFormStyled}
// 			>
// 				<input
// 					type="text"
// 					className={styles.InputStyled}
// 					placeholder="Enter the text"
// 					value={searchText}
// 					onChange={e => searchWord(e.target.value)}
// 				/>
// 				<button
// 					type="submit"
// 					className={styles.StyledSearchButton} onClick={handleSearchClick}
// 				>
// 					<div
// 						className={styles.hoverWrapper}
// 						width="18"
// 						height="18"
// 					>
// 						<svg className={styles.StyledSearchIcon}>
// 							<use href={icons + "#search"}></use>
// 						</svg>
// 					</div>
// 				</button>
// 			</form>
// 			<Select
// 				className={styles.SelectStyled}
// 				options={categoriesList.map(category => {
// 					console.log(category);
// 					return { label: category };
// 				})}
// 				placeholder="All categories"
// 				value={chosenCategory}
// 				onChange={e => setChosenCategory(e.target)}
// 			/>
// 			<Select
// 				className={styles.select}
// 				options={ingredientsList.map(ingredient => {
// 					return { value: ingredient._id, label: ingredient.title };
// 				})}
// 				placeholder="Ingredients"
// 				value={chosenIngredient}
// 				onChange={selectedOption => setChosenIngredient(selectedOption)}
// 			/>
// 		</div>
// 	);
// };

// DrinksSearch.propTypes = {
// 	onSearch: PropTypes.func.isRequired,
// 	categoriesList: PropTypes.array.isRequired,
// 	ingredientsList: PropTypes.array.isRequired,
// };

// export default DrinksSearch;

// ИСХОДНЫЙ

// import axios from "axios";
// // import { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// import { drinksCategoriesList } from "../../../data/drinksData";

// // action//
// // export const setSearchText = text => ({
// // 	type: "SET_SEARCH_TEXT",
// // 	payload: text,
// // });

// // export const setSelectedCategory = category => ({
// // 	type: "SET_SELECTED_CATEGORY",
// // 	payload: category,
// // });

// // export const setSelectedIngredient = ingredient => ({
// // 	type: "SET_SELECTED_INGREDIENT",
// // 	payload: ingredient,
// // });

// // export const setIngredientsList = ingredients => ({
// // 	type: "SET_INGREDIENTS_LIST",
// // 	payload: ingredients,
// // });

// // редюсер//
// // const initialState = {
// // 	searchText: "",
// // 	selectedCategory: "All Categories",
// // 	selectedIngredient: "Ingredients",
// // 	ingredientsList: [],
// // };

// // const rootReducer = (state = initialState, action) => {
// // 	switch (action.type) {
// // 		case "SET_SEARCH_TEXT":
// // 			return { ...state, searchText: action.payload };
// // 		case "SET_SELECTED_CATEGORY":
// // 			return { ...state, selectedCategory: action.payload };
// // 		case "SET_SELECTED_INGREDIENT":
// // 			return { ...state, selectedIngredient: action.payload };
// // 		case "SET_INGREDIENTS_LIST":
// // 			return { ...state, ingredientsList: action.payload };
// // 		default:
// // 			return state;
// // 	}
// // };
// //  схема валидации//

// const validationSchema = Yup.object().shape({
// 	searchText: Yup.string().required("Search text is required"),
// });

// export default function DrinksSearch() {
// 	// const dispatch = useDispatch();
// 	// const { searchText, selectedCategory, selectedIngredient, ingredientsList } = useSelector(state => state);

// 	// useEffect(() => {
// 	// 	// Запрос к бэкенду для получения списка ингредиентов
// 	// 	axios
// 	// 		.get("/api/ingredients")
// 	// 		.then(response => {
// 	// 			const data = response.data;
// 	// 			dispatch(setIngredientsList(data));
// 	// 		})
// 	// 		.catch(error => {
// 	// 			console.error("Error fetching ingredients:", error);
// 	// 		});
// 	// }, []);

// 	return (
// 		<Formik
// 			initialValues={{
// 				searchText: "",
// 				selectedCategory: "All Categories",
// 				selectedIngredient: "Ingredients",
// 			}}
// 			validationSchema={validationSchema}
// 			onSubmit={async values => {
// 				try {
// 					// Отправка данных на бекенд для примера
// 					const response = await axios.post("/api/submit", values);

// 					if (response.status === 200) {
// 						// Обработка успешного ответа от сервера
// 						console.log("Data successfully submitted");
// 					} else {
// 						// Обработка ошибки
// 						console.error("Error submitting data");
// 					}
// 				} catch (error) {
// 					console.error("Error submitting data:", error);
// 				}
// 			}}
// 		>
// 			<Form>
// 				<div>
// 					<Field
// 						type="text"
// 						placeholder="Enter the text"
// 						name="searchText"
// 					/>
// 					<button type="submit">Х</button>
// 					<ErrorMessage
// 						name="searchText"
// 						component="div"
// 					/>
// 				</div>
// 				<div>
// 					<Field
// 						as="select"
// 						name="selectedCategory"
// 					>
// 						<option value="All Categories">All Categories</option>
// 						{drinksCategoriesList.map((category, index) => (
// 							<option
// 								key={index}
// 								value={category}
// 							>
// 								{category}
// 							</option>
// 						))}
// 					</Field>
// 				</div>
// 				<div>
// 					<Field
// 						name="selectedIngredient"
// 						render={({ field }) => (
// 							<div>
// 								<select
// 									{...field}
// 									// onChange={async event => {
// 									// const selectedId = event.target.value;
// 									// try {
// 									// const response = await axios.get(`/api/ingredients/${selectedId}`);
// 									// const ingredient = response.data;
// 									// Обновление состояния с полученным ингредиентом
// 									// dispatch(setSelectedIngredient(ingredient));
// 									// } catch (error) {
// 									// 	console.error("Error fetching ingredient:", error);
// 									// }
// 									// }}
// 								>
// 									<option value="Ingredients">Ingredients</option>
// 									{/* {ingredientsList.map((ingredient, index) => (
// 										<option
// 											key={index}
// 											value={ingredient.id}
// 										>
// 											{ingredient.title}
// 										</option>
// 									))} */}
// 								</select>
// 							</div>
// 						)}
// 					/>
// 				</div>
// 			</Form>
// 		</Formik>
// 	);
// }
