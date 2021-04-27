import React, { useState } from "react";
// import { Link } from "gatsby";
// import SEO from "../components/seo";
// import Layout from "../components/layout";
import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
// import { Html, RoundedBox } from "@react-three/drei"
import { Html, useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { render } from "@testing-library/react";
const Model = () => {
  const gltf = useGLTF("/final-grv-astronaut.blend.gltf", true);
  return <primitive object={gltf.scene} dispose={null} />;
};
const Fall = () => {
    
      return <>
        <Html>Loading</Html>
      </>;
}

const HTMLcontent = () => {

    const ref = useRef();
    //  var res = false;
    useFrame(() => {
      if(ref.current!=undefined)
        ref.current.rotation.y += 0.01;
        // console.log(ref.current)
  });
   
  const renderer = (
    <>
      <ambientLight intensity={0.5} />
      <color attach="background" args={["pink"]} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Suspense
              fallback={ Fall()
        }
          >
        {/* {!res? res=true:null} */}
        <mesh ref={ref}>
          <Model />
        </mesh>
      </Suspense>
    </>
  );

  return renderer;
};
function App() {
    // const [res,setres] = useState(false)
  //   <Layout>
  //     <SEO title="Home" lang="en-us" />
    return(
  <center>
    <Canvas
      style={{ height: "80vh" }}
      colorManagement
      camera={{ position: [40, 20, 140], fov: 2 }}
    >
      <HTMLcontent />
    </Canvas>
    <div>THREE JS</div>
        </center>
    )
  //     {/* <Link to="/page-2">TO PAGE 2</Link> */}
  // //   </Layout>
}

export default App;
