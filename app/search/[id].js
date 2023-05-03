import React, {  useState } from 'react'
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from 'react-native'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import { Text, SafeAreaView } from 'react-native'

import { ScreenHeaderBtn, NearbyJobCard } from '../../components'
import { COLORS, icons, SIZES } from '../../constants'
import styles from '../../styles/search'
import useFetch from '../../hook/useFetch'

const JobSearch = () => {
    const params = useSearchParams();
    const router = useRouter()
    const [page, setPage] = useState(1);
    const [qry, setQry] = useState({
      query: params.id,
      page: page.toString(),
    });
    

    const {
      data: searchResult,
      error: searchError,
      isLoading: searchLoader,
      refetch
    } = useFetch("search", qry);

    

    const handlePagination = (direction) => {
        if (direction === 'left' && page > 1) {
            setPage((page) => page - 1);
            setQry((q) => ({...q, page: page.toString()}));
        } else if (direction === 'right') {
            setPage((page) => page + 1);
            setQry((q) => ({ ...q, page: page.toString()}));
        }
    }

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            headerLeft: () => (
              <ScreenHeaderBtn
                iconUrl={icons.left}
                dimension="60%"
                handlePress={() => router.back()}
              />
            ),
            headerTitle: "",
          }}
        />

        <FlatList
          data={searchResult}
          renderItem={({ item }) => (
            <NearbyJobCard
              job={item}
              handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
            />
          )}
          keyExtractor={(item) => item.job_id}
          contentContainerStyle={{
            padding: SIZES.medium,
            rowGap: SIZES.medium,
          }}
          ListHeaderComponent={() => (
            <>
              <View style={styles.container}>
                <Text style={styles.searchTitle}>{params.id}</Text>
                <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
              </View>
              <View style={styles.loaderContainer}>
                {searchLoader ? (
                  <ActivityIndicator size="large" color={COLORS.primary} />
                ) : (
                  searchError && (
                    <View style={styles.errorContainer}>
                      <Text>Oops! something went wrong</Text>
                      <TouchableOpacity
                        style={styles.reloadBtnContainer}
                        onPress={() => refetch()}
                      >
                        <Image
                          source={icons.reload}
                          resizeMode="contain"
                          style={styles.reloadBtnImage}
                        />
                      </TouchableOpacity>
                    </View>
                  )
                )}
              </View>
            </>
          )}
          ListFooterComponent={() => (
            <View style={styles.footerContainer}>
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => handlePagination("left")}
              >
                <Image
                  source={icons.chevronLeft}
                  style={styles.paginationImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View style={styles.paginationTextBox}>
                <Text style={styles.paginationText}>{page}</Text>
              </View>
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => handlePagination("right")}
              >
                <Image
                  source={icons.chevronRight}
                  style={styles.paginationImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    );
}

export default JobSearch