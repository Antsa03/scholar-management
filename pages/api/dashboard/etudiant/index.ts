import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const studentCounts = await prisma.information.groupBy({
    //   by: ["annee_universitaire_5"],
    //   _count: {
    //     num_matricule: true,
    //   },
    // });
    // return res.status(200).json(studentCounts);
    const studentCounts = await prisma.information.groupBy({
      by: ["annee_universitaire_5", "groupe"],
      _count: {
        num_matricule: true,
      },
      orderBy: {
        groupe: "asc",
      },
    });

    const countsByYear = studentCounts.reduce((acc: any, curr: any) => {
      if (!acc[curr.annee_universitaire_5]) {
        acc[curr.annee_universitaire_5] = {
          total: 0,
          byGroup: {},
        };
      }

      acc[curr.annee_universitaire_5].total += curr._count.num_matricule;
      acc[curr.annee_universitaire_5].byGroup[curr.groupe] =
        curr._count.num_matricule;

      return acc;
    }, {});

    return res.status(200).json(countsByYear);
  } catch (error) {
    return res.status(500).json(error);
  }
}
