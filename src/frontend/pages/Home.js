import React from "react";
import Container from "@mui/material/Container";
import Post from "../components/Post";
import PostObj from "../../backend/PostObj";


let posts = [new PostObj("operatingoracle", "On it differed", "On it differed repeated wandered required in. Then girl neat why yet knew rose spot. Moreover property we he kindness greatest be oh striking laughter. In me he at collecting affronting principles apartments. Has visitor law attacks pretend you calling own excited painted. Contented attending smallness it oh ye unwilling. Turned favour man two but lovers. Suffer should if waited common person little oh. Improved civility graceful sex few smallest screened settling. Likely active her warmly has.", 18, [["username", "comment"], ["username2", "comment2"]]),
    new PostObj("treatycisco", "Now residence dashwoods", "Now residence dashwoods she excellent you. Shade being under his bed her. Much read on as draw. Blessing for ignorant exercise any yourself unpacked. Pleasant horrible but confined day end marriage. Eagerness furniture set preserved far recommend. Did even but nor are most gave hope. Secure active living depend son repair day ladies now.", 48, [["username3", "comment3"], ["username4", "comment4"]]),
    new PostObj("modifiedmicrosoft", "Insipidity the sufficient discretion", "Insipidity the sufficient discretion imprudence resolution sir him decisively. Proceed how any engaged visitor. Explained propriety off out perpetual his you. Feel sold off felt nay rose met you. We so entreaties cultivated astonished is. Was sister for few longer mrs sudden talent become. Done may bore quit evil old mile. If likely am of beauty tastes.", 21, [["username4", "comment4"], ["username5", "comment5"]])];


const Home = () => {
    return (
        <Container>

            {posts.map((post) => (
                <>
                    <Post
                        username={post.username}
                        title={post.title}
                        content={post.content}
                        likes={post.likes}
                        comments={post.comments}
                    />
                    <br/>
                </>
            ))}

        </Container>
    );
};

export default Home;
