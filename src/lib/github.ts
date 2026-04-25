type ContributionDay = {
  date: string;
  contributionCount: number;
  color: string;
  weekday: number;
};

type ContributionData = {
  totalContributions: number;
  months: string[];
  weeks: ContributionDay[][];
};

export async function getGithubContributions(username: string): Promise<ContributionData | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token || !username) return null;

  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            months {
              name
            }
            weeks {
              contributionDays {
                date
                contributionCount
                color
                weekday
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { login: username } }),
    next: { revalidate: 3600 },
  });

  if (!response.ok) return null;

  const json = (await response.json()) as {
    data?: {
      user?: {
        contributionsCollection?: {
          contributionCalendar?: {
            totalContributions: number;
            months: Array<{ name: string }>;
            weeks: Array<{ contributionDays: ContributionDay[] }>;
          };
        };
      };
    };
  };

  const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) return null;

  return {
    totalContributions: calendar.totalContributions,
    months: calendar.months.map((month) => month.name.slice(0, 3)),
    weeks: calendar.weeks.map((week) => week.contributionDays),
  };
}
