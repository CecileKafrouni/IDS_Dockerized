# -*- coding: utf-8 -*-


'''
------------------------------ Main -----------------------------------
'''

import pandas as pd
     

import Modeles_ML as ml
import pickle

# FICHIER CSV 
df = pd.read_csv("total_dataset_normalise.csv", sep=';')


# ENTRAINEMENT DU MODELE
# Gaussian naive Bayes
gnb = ml.gnb(df)
filename_gnb = 'finalized_model_gnb.sav'
pickle.dump(gnb, open(filename_gnb, 'wb'))



# PREDICTION AVEC DONNEES DE TEST
filename_gnb = 'finalized_model_gnb.sav'
loaded_model_gnb = pickle.load(open(filename_gnb, 'rb'))
#pred_gnb = ml.gnbPrediction(df_test, loaded_model_gnb)