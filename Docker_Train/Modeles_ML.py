# Librairies utiles
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
import time

# Gaussian naive Bayes

def gnb(df):

    t_debut = time.time()

    X = df.drop(['Intrusion'], axis = 1)
    y = df['Intrusion']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=1)

    gnb = GaussianNB()

    gnb.fit(X_train, y_train)


    y_pred_gnb = gnb.predict(X_test)

    print('Report GNB \n', classification_report(y_test, y_pred_gnb))

    t_fin = time.time()

    t_total = t_fin - t_debut

    print("Temps pour Gnb (en sec): ", t_total)

    return gnb

def gnbPrediction(df,gnb):
    X_new_gnb = df
    # Predict and print the label for the new data point X_new
    new_prediction_gnb = gnb.predict(X_new_gnb)
    print("New prediction gnb: {}".format(new_prediction_gnb))
    return new_prediction_gnb

