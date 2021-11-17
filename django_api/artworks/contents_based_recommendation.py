import pandas as pd

pd.set_option('display.max_columns', None)

def make_array(txt):
    arr = []
    while True:
        line = txt.readline()
        if not line:
            break
        for e in line.strip().split(' '):
            if e:
                if e[0] == '#':
                    arr.append(e[1:])
                else:
                    arr.append(e)
    return arr


def find_recommended_work(df, sorted_idx, work_num, top_n=10):
    top_sim_idx = sorted_idx[work_num, -(top_n + 1):]
    top_sim_idx = top_sim_idx.reshape(-1, )

    return top_sim_idx


def find_recommended_work_sorted_by_rating(df, sorted_idx, work_num, top_n=10):
    top_sim_idx = sorted_idx[work_num, -(top_n + 1) * 2:]
    top_sim_idx = top_sim_idx.reshape(-1, )
    top_sim_idx = top_sim_idx[top_sim_idx != work_num]
    return df.iloc[top_sim_idx].sort_values(by=['weighted_rating'], ascending=True)[-top_n:]


def weighted_rating(record):
    m = record['rating_count'].quantile(0.6)
    C = record['rating'].mean()

    v = record['rating_count'].tolist()
    R = record['rating'].tolist()
    weighted_r = []
    for i in range(len(R)):
        weighted_r.append((v[i] / (v[i] + m)) * R[i] + (m / (m + v[i]) * C))

    return weighted_r