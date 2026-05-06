import { MouseEvent, useEffect, useState } from 'react';
import cls from './Category.module.css';
import axios from 'axios';

interface CategoryProps {
    categoryId: string;
    onClick: (e: MouseEvent<HTMLDivElement>) => void;
}

const Category = (props: CategoryProps) => {
    const [category, setCategory] = useState('');
    useEffect(() => {
        async function getCategory(): Promise<void> {
            const categoryData = (await axios.get(`http://localhost:3100/api/category/${props.categoryId}`)).data;
            setCategory(categoryData.name);
        }
        getCategory();
    })
    return ( 
        <div onClick={props.onClick} id={props.categoryId} className={cls.category}>
            {category}
        </div>
     );
}
 
export default Category;