import Banner from "../../components/header/banner/Banner";
import Categories from "../../components/sectioncategory/Categories";
import CategorySection from "../../components/sectioncategory/CategorySection";

const Home = () => {
    return (
      <>
       <Banner></Banner>
<Categories></Categories>


       <CategorySection category={'Novel'}></CategorySection>
       <CategorySection category={'Drama'}></CategorySection>
       <CategorySection category={'Thriller'}></CategorySection>
       <CategorySection category={'Science'}></CategorySection>
       </>
    );
};

export default Home;