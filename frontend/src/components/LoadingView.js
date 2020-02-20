import React, { Component } from "react";
import { PropagateLoader } from "react-spinners";

class LoadingView extends Component {
  render() {
    return (
      <div>
        <PropagateLoader color={"blue"} loading={true} />
      </div>
    );
  }
}
export default LoadingView;

// export default function LoadingView({
//   color = skaleMainBlue,
//   topSpacing = 50,
//   hideDots = false
// }) {
//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: "center",
//         marginTop: topSpacing
//       }}
//     >
//       <PropagateLoader
//         color={hideDots ? "transparent" : color}
//         loading={true}
//       />
//     </View>
//   );
// }
