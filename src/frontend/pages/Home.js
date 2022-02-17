import React from "react";
import Container from "@mui/material/Container";
import Post from "../components/Post";
import PostObj from "../../backend/PostObj";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";


let post1 = new PostObj("operatingoracle", "On it differed", "On it differed repeated wandered required in. Then girl neat why yet knew rose spot. Moreover property we he kindness greatest be oh striking laughter. In me he at collecting affronting principles apartments. Has visitor law attacks pretend you calling own excited painted. Contented attending smallness it oh ye unwilling. Turned favour man two but lovers. Suffer should if waited common person little oh. Improved civility graceful sex few smallest screened settling. Likely active her warmly has.", 18, [["username", "comment"], ["username2", "comment2"]]);
let post2 = new PostObj("treatycisco", "Now residence dashwoods", "Now residence dashwoods she excellent you. Shade being under his bed her. Much read on as draw. Blessing for ignorant exercise any yourself unpacked. Pleasant horrible but confined day end marriage. Eagerness furniture set preserved far recommend. Did even but nor are most gave hope. Secure active living depend son repair day ladies now.", 48, [["username3", "comment3"], ["username4", "comment4"]]);
let post3 = new PostObj("modifiedmicrosoft", "Insipidity the sufficient discretion", "Insipidity the sufficient discretion imprudence resolution sir him decisively. Proceed how any engaged visitor. Explained propriety off out perpetual his you. Feel sold off felt nay rose met you. We so entreaties cultivated astonished is. Was sister for few longer mrs sudden talent become. Done may bore quit evil old mile. If likely am of beauty tastes.", 21, [["username4", "comment4"], ["username5", "comment5"]]);

let posts = [new PostObj("operatingoracle", "On it differed", "On it differed repeated wandered required in. Then girl neat why yet knew rose spot. Moreover property we he kindness greatest be oh striking laughter. In me he at collecting affronting principles apartments. Has visitor law attacks pretend you calling own excited painted. Contented attending smallness it oh ye unwilling. Turned favour man two but lovers. Suffer should if waited common person little oh. Improved civility graceful sex few smallest screened settling. Likely active her warmly has.", 18, [["username", "comment"], ["username2", "comment2"]]),
    new PostObj("treatycisco", "Now residence dashwoods", "Now residence dashwoods she excellent you. Shade being under his bed her. Much read on as draw. Blessing for ignorant exercise any yourself unpacked. Pleasant horrible but confined day end marriage. Eagerness furniture set preserved far recommend. Did even but nor are most gave hope. Secure active living depend son repair day ladies now.", 48, [["username3", "comment3"], ["username4", "comment4"]]),
    new PostObj("modifiedmicrosoft", "Insipidity the sufficient discretion", "Insipidity the sufficient discretion imprudence resolution sir him decisively. Proceed how any engaged visitor. Explained propriety off out perpetual his you. Feel sold off felt nay rose met you. We so entreaties cultivated astonished is. Was sister for few longer mrs sudden talent become. Done may bore quit evil old mile. If likely am of beauty tastes.", 21, [["username4", "comment4"], ["username5", "comment5"]])];


function getFeed(posts) {

    let postHTML = ""

    for (const post of posts) {
        // postHTML += "<Post\nusername=\"" + post.username + "\"\ntitle=\"" + post.title + "\"\ncontent=\"" + post.content + "\"\nlikes=" + post.likes + "\ncomments=\"" + post.comments + "\"\n/>\n<br/>"
        postHTML += "<Post\nusername=\"" + post.username + "\"\ntitle=\"" + post.title + "\"\ncontent=\"" + post.content + "\"\nlikes={" + post.likes + "}\n/>\n<br/>"
    }

    // console.log(postHTML)

    let HTMLString = getFeed(posts)
    let HTMLObj = document.createElement("div");
    HTMLObj.innerHTML = HTMLString

    return HTMLObj

}


const Home = () => {

    console.log(HTMLObj)

    return (
        <>
            <Container id="my_container">

                {posts.map((Post) => (
                        <Post>
                            username=post.
                            title="On it differed"
                            content="On it differed repeated wandered required in. Then girl neat why yet knew rose spot. Moreover property we he kindness greatest be oh striking laughter. In me he at collecting affronting principles apartments. Has visitor law attacks pretend you calling own excited painted. Contented attending smallness it oh ye unwilling. Turned favour man two but lovers. Suffer should if waited common person little oh. Improved civility graceful sex few smallest screened settling. Likely active her warmly has."
                            likes={18}
                        </Post>
                ))}



            </Container>

            <script type="text/javascript" charSet="utf-8">
                var ckjhkh = document.getElementById("my_container");


            </script>
        </>
    )
}


// const Home = () => {
//     return (
//         <Container>
//
//             {/*{getFeed(posts)}*/}
//
//
//             <Post
//                 username="operatingoracle"
//                 title="On it differed"
//                 content="On it differed repeated wandered required in. Then girl neat why yet knew rose spot. Moreover property we he kindness greatest be oh striking laughter. In me he at collecting affronting principles apartments. Has visitor law attacks pretend you calling own excited painted. Contented attending smallness it oh ye unwilling. Turned favour man two but lovers. Suffer should if waited common person little oh. Improved civility graceful sex few smallest screened settling. Likely active her warmly has."
//                 likes={18}
//             />
//             <br/>
//
//             <Post
//                 username="treatycisco"
//                 title="Now residence dashwoods"
//                 content="Now residence dashwoods she excellent you. Shade being under his bed her. Much read on as draw. Blessing for ignorant exercise any yourself unpacked. Pleasant horrible but confined day end marriage. Eagerness furniture set preserved far recommend. Did even but nor are most gave hope. Secure active living depend son repair day ladies now."
//                 likes={48}
//             />
//
//             <br/>
//
//             <Post
//                 username="modifiedmicrosoft"
//                 title="Insipidity the sufficient discretion"
//                 content="Insipidity the sufficient discretion imprudence resolution sir him decisively. Proceed how any engaged visitor. Explained propriety off out perpetual his you. Feel sold off felt nay rose met you. We so entreaties cultivated astonished is. Was sister for few longer mrs sudden talent become. Done may bore quit evil old mile. If likely am of beauty tastes."
//                 likes={21}
//             />
//
//             <br/>
//
//
//             {/*    <Post*/}
//             {/*        username="operatingoracle"*/}
//             {/*        title="On it differed"*/}
//             {/*        content="On it differed repeated wandered required in. Then girl neat why yet knew rose spot. Moreover property we he kindness greatest be oh striking laughter. In me he at collecting affronting principles apartments. Has visitor law attacks pretend you calling own excited painted. Contented attending smallness it oh ye unwilling. Turned favour man two but lovers. Suffer should if waited common person little oh. Improved civility graceful sex few smallest screened settling. Likely active her warmly has."*/}
//             {/*        likes={18}*/}
//             {/*    />*/}
//             {/*    <br/><Post*/}
//             {/*    username="treatycisco"*/}
//             {/*    title="Now residence dashwoods"*/}
//             {/*    content="Now residence dashwoods she excellent you. Shade being under his bed her. Much read on as draw. Blessing for ignorant exercise any yourself unpacked. Pleasant horrible but confined day end marriage. Eagerness furniture set preserved far recommend. Did even but nor are most gave hope. Secure active living depend son repair day ladies now."*/}
//             {/*    likes={48}*/}
//             {/*/>*/}
//             {/*    <br/><Post*/}
//             {/*    username="modifiedmicrosoft"*/}
//             {/*    title="Insipidity the sufficient discretion"*/}
//             {/*    content="Insipidity the sufficient discretion imprudence resolution sir him decisively. Proceed how any engaged visitor. Explained propriety off out perpetual his you. Feel sold off felt nay rose met you. We so entreaties cultivated astonished is. Was sister for few longer mrs sudden talent become. Done may bore quit evil old mile. If likely am of beauty tastes."*/}
//             {/*    likes={21}*/}
//             {/*/>*/}
//             {/*    <br/>*/}
//
//
//             {/*<Post*/}
//             {/*    username={post1.username}*/}
//             {/*    title={post1.title}*/}
//             {/*    content={post1.content}*/}
//             {/*    likes={post1.likes}*/}
//             {/*    comments={post1.comments}*/}
//
//             {/*/>*/}
//             {/*<br/>*/}
//             {/*<Post*/}
//             {/*    username={post2.username}*/}
//             {/*    title={post2.title}*/}
//             {/*    content={post2.content}*/}
//             {/*    likes={post2.likes}*/}
//             {/*    comments={post2.comments}*/}
//             {/*/>*/}
//             {/*<br/>*/}
//             {/*<Post*/}
//             {/*    username={post3.username}*/}
//             {/*    title={post3.title}*/}
//             {/*    content={post3.content}*/}
//             {/*    likes={post3.likes}*/}
//             {/*    comments={post3.comments}*/}
//             {/*/>*/}
//             {/*<br/>*/}
//         </Container>
//     );
// };
//
export default Home;
