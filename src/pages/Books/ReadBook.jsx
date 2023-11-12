import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import useAxiosIntercepter from "../../hooks/useAxiosIntercepter";
import { Page, Text, View, Document, StyleSheet, PDFViewer ,Image} from '@react-pdf/renderer';
import { useState } from "react";
import Error from "../Error/Error";







const ReadBook = () => {
    let [pdf,setPdf]=useState(false)
    const id=useParams().id
  let axiosCustom =useAxiosIntercepter()

let {data,isLoading,isFetching,error}=useQuery({
    queryKey:['singleBook'],
    queryFn:async ()=>await axiosCustom.get(`/book/${id}`)
})


if(isLoading||isFetching){
    return(
        <div className=" w-screen h-screen absolute top-0 flex mx-auto justify-center items-center">
        <span className="loading loading-infinity loading-lg"></span>
       </div>
    )
}

if(error){
  return(
  <Error></Error>
  )
}

let{name,sneakPeek,image}=data.data



// Create styles
const styles = StyleSheet.create({
    page: {
      flexDirection: 'col',
      backgroundColor: '#E4E4E4',
      height: '100%',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },gap:    {
paddingTop:30,
color:'gray'
    }
  });
  
  // Create Document Component
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src={image}></Image>
        <View style={styles.section}>
          <Text>{name}</Text>
          
          <Text style={styles.gap}>{sneakPeek}</Text>
        </View>
      
      </Page>
    </Document>
  );







if(!pdf){
    return (
        <div className=" container mx-auto mt-28 p-10">
            <h1 className=" font-bold text-2xl  pb-10">{name}</h1>
            <p className=" pb-10 text-lg text-[#8f8a8a]">{sneakPeek}</p>
            <button className="bg-[#113546a2] hover:bg-slate-700 px-4 py-2 text-slate-50 rounded-md shadow-lg font-bold" onClick={()=>(setPdf(true))}>Open In pdf</button>
        </div>
    );
}else{
    return(
        <PDFViewer className="absolute top-0 h-screen w-full">
    <MyDocument />
  </PDFViewer>
    )
}




}




   

export default ReadBook;