import React from "react";
import Container from "@mui/material/Container";
import Post from "../components/Post";
import PostObj from "../../backend/PostObj";


let posts = [new PostObj("operatingoracle", "On it differed", "On it differed repeated wandered required in. Then girl neat why yet knew rose spot. Moreover property we he kindness greatest be oh striking laughter. In me he at collecting affronting principles apartments. Has visitor law attacks pretend you calling own excited painted. Contented attending smallness it oh ye unwilling. Turned favour man two but lovers. Suffer should if waited common person little oh. Improved civility graceful sex few smallest screened settling. Likely active her warmly has.", 18, [["username1", "comment1 - Use securing confined his shutters. Delightful as he it acceptance an solicitude discretion reasonably. Carriage we husbands advanced an perceive greatest."], ["username2", "comment2 - Totally dearest expense on demesne ye he. Curiosity excellent commanded in me. Unpleasing impression themselves to at assistance acceptance my or. On consider laughter civility offended oh."]]),
    new PostObj("treatycisco", "Now residence dashwoods", "Now residence dashwoods she excellent you. Shade being under his bed her. Much read on as draw. Blessing for ignorant exercise any yourself unpacked. Pleasant horrible but confined day end marriage. Eagerness furniture set preserved far recommend. Did even but nor are most gave hope. Secure active living depend son repair day ladies now.", 48, [["username3", "comment3 - Far concluded not his something extremity. Want four we face an he gate. On he of played he ladies answer little though nature. Blessing oh do pleasure as so formerly."], ["username4", "comment4 - Took four spot soon led size you. Outlived it received he material. Him yourself joy moderate off repeated laughter outweigh screened."]]),
    new PostObj("modifiedmicrosoft", "Insipidity the sufficient discretion", "Insipidity the sufficient discretion imprudence resolution sir him decisively. Proceed how any engaged visitor. Explained propriety off out perpetual his you. Feel sold off felt nay rose met you. We so entreaties cultivated astonished is. Was sister for few longer mrs sudden talent become. Done may bore quit evil old mile. If likely am of beauty tastes.", 21, [["username4", "comment4 - Advantage old had otherwise sincerity dependent additions. It in adapted natural hastily is justice. Six draw you him full not mean evil. Prepare garrets it expense windows shewing do an."], ["username5", "comment5 - She projection advantages resolution son indulgence. Part sure on no long life am at ever. In songs above he as drawn to. Gay was outlived peculiar rendered led six."]])];


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
