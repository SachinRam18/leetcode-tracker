export default async function handler(req: any, res: any) {
  const { username } = req.query;

  const query = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
    userContestRanking(username: $username) {
      rating
      globalRanking
      attendedContestsCount
      topPercentage
    }
    userProfileUserQuestionProgressV2(userSlug: $username) {
      numAcceptedQuestions {
        difficulty
        count
      }
    }
  }
  `;

  const response = await fetch("https://leetcode.com/graphql/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      variables: { username }
    })
  });

  const data = await response.json();

  res.status(200).json(data);
}
