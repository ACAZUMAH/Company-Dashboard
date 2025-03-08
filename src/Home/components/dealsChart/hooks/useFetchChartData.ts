import { useList } from "@refinedev/core";
import gql from "graphql-tag";
import { useMemo } from "react";
import { mapDealsData } from "../helpers";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { DashboardDealsChartQuery } from "@/interfaces/graphql/types";


const chartDataGql = gql`
  query DashboardDealsChart(
    $filter: DealStageFilter!
    $sorting: [DealStageSort!]
    $paging: OffsetPaging
  ) {
    dealStages(filter: $filter, sorting: $sorting, paging: $paging) {
      nodes {
        id
        title
        dealsAggregate {
          groupBy {
            closeDateMonth
            closeDateYear
          }
          sum {
            value
          }
        }
      }
      totalCount
    }
  }
`;

export const useFetchChartData = () => {
    const { data } = useList<GetFieldsFromList<DashboardDealsChartQuery>>({
        resource: 'dealStages',
        filters: [{ field: 'title', operator: 'in', value: ['WON', 'LOST']}],
        meta: {
            gqlQuery: chartDataGql,
        }
    })
    
    const deals = useMemo(() => { return mapDealsData(data?.data)}, [data?.data])

    return { deals }
}